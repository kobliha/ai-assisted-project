// Ensure the DOM is fully loaded before running scripts
$(document).ready(function() {
    console.log("Application started and jQuery is working!");
    
    const $editButton = $("#btn-edit");
    const $deleteButton = $("#btn-delete");
    const $itemModal = $("#item-modal-backdrop");
    const $itemsTable = $("#items-table tbody");
    let nextId = 3; // Start IDs for new items after the initial sample data

    /**
     * Updates the enabled/disabled state of the Edit and Delete buttons
     * based on the number of selected rows in the table.
     */
    function updateButtonStates() {
        const selectedCount = $itemsTable.find("tr.pf-m-selected").length;
        $editButton.prop("disabled", selectedCount !== 1);
        $deleteButton.prop("disabled", selectedCount === 0);
    }

    /**
     * Opens the modal dialog.
     * @param {string} title - The title for the modal.
     * @param {object} [data] - Optional data to pre-fill the form (for editing).
     */
    function openModal(title, data) {
        $("#item-modal-title").text(title);
        if (data) {
            $("#item-id").val(data.id).prop("readonly", true);
            $("#item-name").val(data.name);
            $("#item-price").val(data.price);
        } else {
            $("#item-id").val(nextId).prop("readonly", true);
            $("#item-name").val("");
            $("#item-price").val("");
        }
        $itemModal.show();
    }

    /** Closes the modal dialog. */
    function closeModal() {
        $itemModal.hide();
    }

    // --- Event Handlers ---

    // Handle row selection
    $itemsTable.on("click", "tr", function(event) {
        const $clickedRow = $(this);
        const isCtrlPressed = event.ctrlKey || event.metaKey; // metaKey for macOS

        if (!isCtrlPressed) {
            // If Ctrl is not pressed, deselect all other rows
            $clickedRow.siblings().removeClass("pf-m-selected");
        }

        $clickedRow.toggleClass("pf-m-selected");
        updateButtonStates();
    });

    // "Add New" button click
    $("#btn-add").on("click", function() {
        openModal("Add New Item");
    });

    // "Edit" button click
    $("#btn-edit").on("click", function() {
        const $selectedRow = $itemsTable.find("tr.pf-m-selected");
        const itemData = {
            id: $selectedRow.data("id"),
            name: $selectedRow.find("td[data-label='Name']").text(),
            price: $selectedRow.find("td[data-label='Price']").text(),
        };
        openModal("Edit Item", itemData);
    });

    // "Delete" button click
    $("#btn-delete").on("click", function() {
        if (confirm("Are you sure you want to delete the selected items?")) {
            $itemsTable.find("tr.pf-m-selected").remove();
            updateButtonStates();
        }
    });

    // Modal "Save" button click
    $("#item-modal-save").on("click", function() {
        const id = $("#item-id").val();
        const name = $("#item-name").val();
        const price = $("#item-price").val();
        const $existingRow = $itemsTable.find(`tr[data-id='${id}']`);

        if ($existingRow.length) { // Editing existing row
            $existingRow.find("td[data-label='Name']").text(name);
            $existingRow.find("td[data-label='Price']").text(price);
        } else { // Adding new row
            const newRow = `<tr class="pf-v5-c-table__tr" role="button" data-id="${id}"><td class="pf-v5-c-table__td" data-label="ID">${id}</td><td class="pf-v5-c-table__td" data-label="Name">${name}</td><td class="pf-v5-c-table__td" data-label="Price">${price}</td></tr>`;
            $itemsTable.append(newRow);
            nextId++;
        }
        closeModal();
    });

    // Modal "Cancel" and "Close" button clicks
    $("#item-modal-cancel, #item-modal-close").on("click", closeModal);
});

// A simple function to demonstrate unit testing
function add(a, b) {
    return a + b;
}

// Export the function if you are using a module system for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = add;
}
