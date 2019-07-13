describe('Login flow', () => {
  it('should login successfully', async () => {
    await expect(element(by.id('email'))).toBeVisible();
    await element(by.id('email')).clearText();
    await element(by.id('password')).clearText();
    await element(by.id('email')).replaceText('istvanskeri@gmail.com');
    await element(by.id('password')).replaceText('evensteven');
    await element(by.id('login')).tap();
    await expect(element(by.id('email'))).toNotExist();
  });
});
