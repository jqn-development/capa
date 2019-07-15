describe('Upload flow', () => {
    it('should login successfully', async () => {
      await expect(element(by.id('email'))).toBeVisible();
      await element(by.id('email')).clearText();
      await element(by.id('password')).clearText();
      await element(by.id('email')).replaceText('istvanskeri@gmail.com');
      await element(by.id('password')).replaceText('evensteven');
      await element(by.id('login')).tap();
      await expect(element(by.id('email'))).toNotExist();
    });
    it('should upload successfully', async () => {
      await element(by.id('upload')).tap();
      await element(by.id('uploadImage')).tap();
      await waitFor(element(by.id('uploadProgress'))).toBeVisible().withTimeout(3000);
      await waitFor(element(by.id('uploadProgress'))).toBeNotVisible().withTimeout(3000);
    });
});
