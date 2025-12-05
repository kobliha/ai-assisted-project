/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

// Import jQuery to ensure it's available in the JSDOM environment
const $ = require('jquery');

// Make jQuery globally available for app.js before it's required
global.$ = $;
global.jQuery = $;


describe('Table functionality', () => {
  let $itemsTable;
  let $editButton;
  let $deleteButton;
  let $itemModal;
  let $itemModalTitle;
  let $itemId;
  let $itemName;
  let $itemPrice;
  let $itemModalSave;
  let $itemModalCancel;
  let $itemModalClose;
  let updateButtonStates;

  beforeEach(async () => {
    // Read the HTML file and set the body content for our test DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    // Extract the content of the body tag
    const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
    document.body.innerHTML = bodyContent;

    // Reset modules to ensure a clean require
    jest.resetModules();
    const app = require('../js/app');
    // Wait for the $(document).ready() in app.js to complete
    await app.ready;
    updateButtonStates = app.updateButtonStates;

    $itemsTable = $("#items-table tbody");
    $editButton = $("#btn-edit");
    $deleteButton = $("#btn-delete");
    $itemModal = $("#item-modal-backdrop");
    $itemModalTitle = $("#item-modal-title");
    $itemId = $("#item-id");
    $itemName = $("#item-name");
    $itemPrice = $("#item-price");
    $itemModalSave = $("#item-modal-save");
    $itemModalCancel = $("#item-modal-cancel");
    $itemModalClose = $("#item-modal-close");
  });

  test('buttons are disabled when no rows are selected', () => {
    // Initially, no rows are selected, so buttons should be disabled
    updateButtonStates(); // Call the exposed function
    expect($editButton.prop('disabled')).toBe(true);
    expect($deleteButton.prop('disabled')).toBe(true);
  });

  test('edit button is enabled when one row is selected', () => {
    const $row1 = $itemsTable.find("tr[data-id='1']");
    $row1.addClass("pf-m-selected");
    updateButtonStates(); // Call the exposed function

    expect($editButton.prop('disabled')).toBe(false);
    expect($deleteButton.prop('disabled')).toBe(false);
  });

  test('delete button is enabled when multiple rows are selected', () => {
    const $row1 = $itemsTable.find("tr[data-id='1']");
    const $row2 = $itemsTable.find("tr[data-id='2']");

    $row1.addClass("pf-m-selected");
    $row2.addClass("pf-m-selected");
    updateButtonStates(); // Call the exposed function

    expect($editButton.prop('disabled')).toBe(true); // Edit should be disabled for multiple
    expect($deleteButton.prop('disabled')).toBe(false);
  });

  test('add new item modal opens correctly', () => {
    $("#btn-add").trigger('click');

    expect($itemModal.css('display')).not.toBe('none');
    expect($itemModalTitle.text()).toBe('Add New Item');
    expect($itemId.val()).toBe('3'); // nextId starts at 3
    expect($itemName.val()).toBe('');
    expect($itemPrice.val()).toBe('');
  });

  test('edit item modal opens with correct data', () => {
    const $row1 = $itemsTable.find("tr[data-id='1']");
    $row1.addClass("pf-m-selected");
    updateButtonStates(); // Ensure buttons are enabled
    $("#btn-edit").trigger('click');

    expect($itemModal.css('display')).not.toBe('none');
    expect($itemModalTitle.text()).toBe('Edit Item');
    expect($itemId.val()).toBe('1');
    expect($itemName.val()).toBe('PatternFly Hat');
    expect($itemPrice.val()).toBe('$25.00');
  });

  test('modal closes when cancel button is clicked', () => {
    $("#btn-add").trigger('click'); // Open modal
    expect($itemModal.css('display')).not.toBe('none');

    $itemModalCancel.trigger('click');
    expect($itemModal.css('display')).toBe('none');
  });

  test('modal closes when close button is clicked', () => {
    $("#btn-add").trigger('click'); // Open modal
    expect($itemModal.css('display')).not.toBe('none');

    $itemModalClose.trigger('click');
    expect($itemModal.css('display')).toBe('none');
  });

  test('new item is added to the table', () => {
    $("#btn-add").trigger('click');
    $itemName.val('New Item');
    $itemPrice.val('$99.99');
    $itemModalSave.trigger('click');

    const $newRow = $itemsTable.find("tr[data-id='3']");
    expect($newRow.length).toBe(1);
    expect($newRow.find("td[data-label='Name']").text()).toBe('New Item');
    expect($newRow.find("td[data-label='Price']").text()).toBe('$99.99');
    expect($itemsTable.find('tr').length).toBe(3); // 2 initial + 1 new
  });

  test('existing item is updated in the table', () => {
    const $row1 = $itemsTable.find("tr[data-id='1']");
    $row1.addClass("pf-m-selected");
    updateButtonStates(); // Ensure buttons are enabled
    $("#btn-edit").trigger('click');

    $itemName.val('Updated Hat');
    $itemPrice.val('$35.00');
    $itemModalSave.trigger('click');

    expect($row1.find("td[data-label='Name']").text()).toBe('Updated Hat');
    expect($row1.find("td[data-label='Price']").text()).toBe('$35.00');
  });

  test('selected items are deleted from the table', () => {
    const $row1 = $itemsTable.find("tr[data-id='1']");
    $row1.addClass("pf-m-selected");
    updateButtonStates(); // Ensure buttons are enabled
    
    // Mock window.confirm for the delete action
    const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);

    $("#btn-delete").trigger('click');

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete the selected items?");
    expect($itemsTable.find("tr[data-id='1']").length).toBe(0);
    expect($itemsTable.find('tr').length).toBe(1); // Only row 2 should remain
    expect($editButton.prop('disabled')).toBe(true);
    expect($deleteButton.prop('disabled')).toBe(true);

    confirmSpy.mockRestore(); // Clean up the mock
  });
});