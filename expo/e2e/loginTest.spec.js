const { reloadApp } = require('detox-expo-helpers');

describe('Login flow', () => {
  it('should login successfully', async () => {
    await reloadApp();
    await expect(element(by.id('email'))).toBeVisible();
    await element(by.id('email')).clearText();
    await element(by.id('password')).clearText();
    await element(by.id('email')).replaceText('istvanskeri@gmail.com');
    await element(by.id('password')).replaceText('evensteven');
    await element(by.id('login')).tap();
    //await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(by.id('email'))).toNotExist();
  });
});
