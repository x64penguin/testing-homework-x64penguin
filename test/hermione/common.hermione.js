const { assert } = require('chai');
const { elementHasClass } = require('../test-utils');

const navlinksCorrect = ["/hw/store/catalog", "/hw/store/delivery", "/hw/store/contacts", "/hw/store/cart"];
const bugId = "?bug_id=8";

describe('main tests', async function() {
    it("nav links", async ({browser}) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url("/hw/store" + bugId);

        const navlinks = await browser.$(".navbar-nav");

        await navlinks.waitForExist();

        for (let i = 1; i <= 4; i++) {
            const navlink = await navlinks.$(`.nav-link:nth-child(${i})`);

            await navlink.waitForExist({timeout: 500});

            assert(await navlink.getAttribute("href") == navlinksCorrect[i - 1], "broken navlink");
        }
    });

    it("menu collapse", async ({browser}) => {
        await browser.setWindowSize(500, 1080);
        await browser.url("/hw/store/" + bugId); // ?bug_id=4 crashing!

        const applicationMenu = await browser.$(".Application-Menu");
        await applicationMenu.waitForExist();

        const applicationToggler = await browser.$(".Application-Toggler");
        await applicationToggler.waitForExist();
        await applicationToggler.click();

        const link = await applicationMenu.$$(".nav-link")[0];
        link.waitForExist({timeout: 500});

        await link.click();

        const applicationMenuCollapsed = await elementHasClass(applicationMenu, "collapse");

        assert(applicationMenuCollapsed, "not collapsing after click");
    });

    it("title link", async ({browser}) => {
        await browser.url("/hw/store/catalog" + bugId);

        const title = await browser.$(".Application-Brand");
        await title.waitForExist();

        await title.click();

        assert(await browser.getUrl() == "http://localhost:3000/hw/store/", "title is not link to main page");
    });
});