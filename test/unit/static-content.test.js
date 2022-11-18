import { expect } from "chai";
import renderer from "react-test-renderer";
import { Contacts } from "../../src/client/pages/Contacts";
import { Delivery } from "../../src/client/pages/Delivery";
import { Home } from "../../src/client/pages/Home";

it("static pages check", () => {
    const contactsPage = renderer.create(Contacts);
    const deliveryPage = renderer.create(Delivery);
    const homePage = renderer.create(Home);

    expect(contactsPage).not.undefined;
    expect(deliveryPage).not.undefined;
    expect(homePage).not.undefined;
})