import { html, render } from "../../lib/js/lit-html/lit-html.js";
import { classify, withState } from "../utilities.js";

/**
 *
 * @param {(string|{})[][]} buttons
 */

export const radioContainer = buttons => html`
  <div id="radio_container">
    <table>
      ${buttons.map(
        listOButtons => html`
          <tr>
            ${listOButtons.map(
              button =>
                html`
                  <td>${buttonize(button)}</td>
                `
            )}
          </tr>
        `
      )}
      <tr>
        <td></td>
      </tr>
    </table>
  </div>
`;
