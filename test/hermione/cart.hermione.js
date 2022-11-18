const { assert } = require('chai');
const { elementHasClass } = require('../test-utils');

const bugId = "?bug_id=8";

describe("cart tests", () => {
    it("item in cart", async ({browser}) => {
        await browser.url("/hw/store/catalog/0" + bugId);

        await browser.execute(() => localStorage.clear());

        const productDetails = await browser.$(".Product > .ProductDetails > div:nth-child(2)");
        await productDetails.waitForExist();

        const addToCardButton = await browser.$(".ProductDetails-AddToCart");;
        await addToCardButton.click(); // commenting this breaks test

        const itemInCart = await productDetails.$("p > .CartBadge");

        assert(await itemInCart.isDisplayed());
    });

    it("adding to cart", async ({browser}) => {
        await browser.url("/hw/store/catalog/0" + bugId);

        const productDetails = await browser.$(".Product > .ProductDetails > div:nth-child(2)");
        await productDetails.waitForExist();

        const addToCardButton = await browser.$(".ProductDetails-AddToCart");
        await addToCardButton.click();

        const itemAmount1 = await browser.execute(() => JSON.parse(localStorage.getItem("example-store-cart"))[0].count);

        console.log(itemAmount1);

        await addToCardButton.click();

        const itemAmount2 = await browser.execute(() => JSON.parse(localStorage.getItem("example-store-cart"))[0].count);

        assert(itemAmount1 + 1 == itemAmount2, "double click on add to cart not increasing items");
    });

    it("cart saving", async ({browser}) => {
        await browser.url("/hw/store/catalog/0" + bugId);

        const productDetails = await browser.$(".Product > .ProductDetails > div:nth-child(2)");
        await productDetails.waitForExist();

        const addToCardButton = await browser.$(".ProductDetails-AddToCart");
        await addToCardButton.click();

        const cartState1 = await browser.execute(() => localStorage.getItem("example-store-cart"));

        await browser.url("/hw/store/cart" + bugId);
        
        const cartState2 = await browser.execute(() => localStorage.getItem("example-store-cart"));

        assert(cartState1 == cartState2, "cart state not saved after page reload");
    });

    it("total items in cart", async ({browser}) => {
        await browser.url("/hw/store/catalog/0" + bugId);
        await browser.execute(() => localStorage.clear());

        let productDetails = await browser.$(".Product > .ProductDetails > div:nth-child(2)");
        await productDetails.waitForExist();

        let addToCardButton = await browser.$(".ProductDetails-AddToCart");
        await addToCardButton.click();

        await browser.url("/hw/store/catalog/1" + bugId);
        
        productDetails = await browser.$(".Product > .ProductDetails > div:nth-child(2)");
        await productDetails.waitForExist();

        addToCardButton = await browser.$(".ProductDetails-AddToCart");
        await addToCardButton.click();

        const cartLink = await browser.$(".navbar-nav > .nav-link:nth-child(4)");
        const cartText = await cartLink.getText();

        assert(cartText == "Cart (2)", `total cart intems displayed incorrectly: ${cartText}`);
    });
})