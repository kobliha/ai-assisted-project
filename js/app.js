// Ensure the DOM is fully loaded before running scripts
$(document).ready(function() {
    console.log("Application started and jQuery is working!");

    // Example of a jQuery event handler for the button
    $("#my-button").on("click", function() {
        alert("Button clicked!");
    });
});

// A simple function to demonstrate unit testing
function add(a, b) {
    return a + b;
}

// Export the function if you are using a module system for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = add;
}
