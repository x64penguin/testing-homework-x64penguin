import { render } from "react-test-renderer";
import { Application } from "../../src/client/Application";

describe('Main tests', () => {
    it('Menu should be collapsed', () => {
        const app = render(<Application />);
        console.log(app);
    });
});