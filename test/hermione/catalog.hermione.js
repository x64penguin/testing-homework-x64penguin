const { assert } = require('chai');

const bugId = "?bug_id=8";

describe("catalog tests", () => {
    it("items exsisting", async ({browser}) => {
        await browser.url("/hw/store/catalog" + bugId);

        const catalogContainer = await browser.$(".Catalog > .row:nth-child(2)");
        await catalogContainer.waitForExist();

        const items = await catalogContainer.$$(":scope > div");
        items.forEach((item) => {
            assert(item.isDisplayed(), "item not displayed");

            const itemBody = item.$(".card-body");

            const itemName = itemBody.$(".ProductItem-Name");
            const itemPrice = itemBody.$(".ProductItem-Price");
            const itemDetalis = itemBody.$(".ProductItems-DetailsLink");

            assert(itemName.isDisplayed(), "name not displayed");
            assert(itemPrice.isDisplayed(), "price not displayed");
            assert(itemDetalis.isDisplayed(), "detalis link not displayed");
        })
    });

    it("item page", async ({browser}) => {
        await browser.url("/hw/store/catalog/0" + bugId);

        const productDetails = await browser.$(".Product > .ProductDetails > div:nth-child(2)");
        await productDetails.waitForExist();

        const productName = await browser.$(".ProductDetails-Name");
        const productDescription = await browser.$(".ProductDetails-Description");
        const productPrice = await browser.$(".ProductDetails-Price");
        const productAdd = await browser.$(".ProductDetails-AddToCart");
        const productColor = await browser.$(".ProductDetails-Color");
        const productMaterial = await browser.$(".ProductDetails-Material"); // Materiales - borkes test

        assert(await productName.isDisplayed(), "not displaying name");
        assert(await productDescription.isDisplayed(), "not displaying description");
        assert(await productPrice.isDisplayed(), "not displaying price");
        assert(await productAdd.isDisplayed(), "not displaying add");
        assert(await productColor.isDisplayed(), "not displaying color");
        assert(await productMaterial.isDisplayed(), "not displaying material");
    });
});