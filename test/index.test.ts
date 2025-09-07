import Notify from '../src';

describe('Notify Library', () => {
  // Don't reset DOM between tests to avoid breaking the singleton pattern
  afterAll(() => {
    // Clean up only at the end
    const container = document.getElementById('notifyContainer-center-top');
    if (container) {
      container.remove();
    }
  });

  describe('Basic Functionality', () => {
    it('should have window and document available', () => {
      expect(typeof window).toBe('object');
      expect(typeof document).toBe('object');
      expect(document.body).toBeTruthy();
    });

    it('should create a notification container when first notification is created', () => {
      Notify.success({ message: 'Container test message' });
      
      const container = document.getElementById('notifyContainer-center-top');
      expect(container).toBeTruthy();
    });

    it('should create success notification', () => {
      Notify.success({ message: 'Success message unique' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const successNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Success message unique')
      );
      expect(successNotification).toBeTruthy();
      expect(successNotification?.textContent).toContain('Success message unique');
    });

    it('should create error notification', () => {
      Notify.error({ message: 'Error message' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      expect(notifications.length).toBeGreaterThan(0);
      
      // Find the error notification (it should be the last one)
      const errorNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Error message')
      );
      expect(errorNotification).toBeTruthy();
    });

    it('should create warning notification', () => {
      Notify.warning({ message: 'Warning message' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const warningNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Warning message')
      );
      expect(warningNotification).toBeTruthy();
    });

    it('should create info notification', () => {
      Notify.info({ message: 'Info message' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const infoNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Info message')
      );
      expect(infoNotification).toBeTruthy();
    });
  });

  describe('Notification Types and Styling', () => {
    it('should apply correct type class for success notification', () => {
      Notify.success({ message: 'Test Success Class' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const successNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Test Success Class')
      );
      expect(successNotification?.classList.contains('notify-success')).toBe(true);
    });

    it('should apply correct type class for error notification', () => {
      Notify.error({ message: 'Test Error Class' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const errorNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Test Error Class')
      );
      expect(errorNotification?.classList.contains('notify-error')).toBe(true);
    });

    it('should apply correct background color for success notification', () => {
      Notify.success({ message: 'Test Success Color' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const successNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Test Success Color')
      ) as HTMLElement;
      expect(successNotification?.style.background).toBe('rgb(19, 191, 95)');
    });

    it('should apply correct background color for error notification', () => {
      Notify.error({ message: 'Test Error Color' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const errorNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Test Error Color')
      ) as HTMLElement;
      expect(errorNotification?.style.background).toBe('rgb(222, 53, 11)');
    });
  });

  describe('Icons', () => {
    it('should display icon when provided', () => {
      const iconHtml = '<svg>test icon</svg>';
      Notify.success({ 
        message: 'Test with icon',
        icon: { el: iconHtml }
      });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const iconNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Test with icon')
      );
      expect(iconNotification?.innerHTML).toContain(iconHtml);
    });

    it('should work without icon', () => {
      Notify.success({ message: 'Test without icon' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const noIconNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Test without icon')
      );
      expect(noIconNotification).toBeTruthy();
    });
  });

  describe('Multiple Notifications', () => {
    it('should create multiple notifications', () => {
      const initialCount = document.querySelectorAll('.notifyCustom').length;
      
      Notify.success({ message: 'First notification unique' });
      Notify.error({ message: 'Second notification unique' });
      
      const finalCount = document.querySelectorAll('.notifyCustom').length;
      expect(finalCount).toBe(initialCount + 2);
    });

    it('should assign unique IDs to notifications', () => {
      Notify.success({ message: 'First unique ID' });
      Notify.error({ message: 'Second unique ID' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const firstNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('First unique ID')
      );
      const secondNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Second unique ID')
      );
      
      expect(firstNotification?.id).toMatch(/^notify-\d+$/);
      expect(secondNotification?.id).toMatch(/^notify-\d+$/);
      expect(firstNotification?.id).not.toBe(secondNotification?.id);
    });
  });

  describe('DOM Management', () => {
    it('should create notification wrapper', () => {
      Notify.success({ message: 'Wrapper test message' });
      
      const wrapper = document.getElementById('divNotification-center-top');
      expect(wrapper).toBeTruthy();
    });

    it('should apply animation classes and styles', () => {
      Notify.success({ message: 'Animation test unique' });
      
      const notifications = document.querySelectorAll('.notifyCustom');
      const animationNotification = Array.from(notifications).find(n => 
        n.textContent?.includes('Animation test unique')
      ) as HTMLElement;
      
      expect(animationNotification).toBeTruthy();
      expect(animationNotification?.style.opacity).toBe('0');
      expect(animationNotification?.style.display).toBe('flex');
      expect(animationNotification?.style.alignItems).toBe('center');
    });
  });
});
