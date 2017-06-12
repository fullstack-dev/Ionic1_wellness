var text = element(by.binding('email.text'));
var valid = element(by.binding('myForm.email.$valid'));
var email = element(by.model('email.text'));

it('should initialize to model', function () {
    expect(text.getText()).toContain('me@example.com');
    expect(valid.getText()).toContain('true');
});

it('should be invalid if empty', function () {
    email.clear();
    email.sendKeys('');
    expect(text.getText()).toEqual('text =');
    expect(valid.getText()).toContain('false');
});

it('should be invalid if not email', function () {
    email.clear();
    email.sendKeys('xxx');

    expect(valid.getText()).toContain('false');
});


var model = element(by.binding('password'));
var input = element(by.id('password'));

it('should validate the input with the default minlength', function () {
    input.sendKeys('ab');
    expect(model.getText()).not.toContain('ab');

    input.sendKeys('abc');
    expect(model.getText()).toContain('abc');
});
