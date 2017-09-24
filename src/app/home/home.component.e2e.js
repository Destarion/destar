describe('App', function () {
    beforeEach(function () {
        // change hash depending on router LocationStrategy
        browser.get('/#/home');
    });
    it('should have a title', function () {
        var subject = browser.getTitle();
        var result = 'Angular 2 MEAN Webpack Starter Kit by @datatype_void';
        expect(subject).toEqual(result);
    });
    it('should have `your content here` x-large', function () {
        var subject = element(by.css('[x-large]')).getText();
        var result = 'Your Content Here';
        expect(subject).toEqual(result);
    });
});
//# sourceMappingURL=home.component.e2e.js.map