document.addEventListener('DOMContentLoaded', () => {
    const colorSwatchItems = document.querySelectorAll('.color-swatch-item');
    const journalColorInput = document.getElementById('journal-color-input');
    const invalidFeedback = document.querySelector('.invalid-feedback');

    // Function to update the selected color and UI
    function setSelectedColor(colorValue) {
        let finalColor = colorValue;

        // Update hidden input
        journalColorInput.value = finalColor;

        // Remove 'selected' class from all swatches
        colorSwatchItems.forEach(item => {
            item.querySelector('.color-swatch').classList.remove('selected');
        });

        // Add 'selected' class to the clicked swatch or initial random if applicable
        const clickedSwatch = document.querySelector(`.color-swatch-item[data-value="${colorValue}"] .color-swatch`);
        if (clickedSwatch) {
            clickedSwatch.classList.add('selected');
        } 
        // Hide validation message
        invalidFeedback.style.display = 'none';
    }

    // Add click event listeners to all color swatch items
    colorSwatchItems.forEach(item => {
        item.addEventListener('click', () => {
            const colorValue = item.getAttribute('data-value');
            setSelectedColor(colorValue);
            if(item){
                const journalBox = document.querySelector(".journal-entry");
                const journalBoxEdit = document.querySelector(".journal-entry-edit");
                journalBox.style.backgroundColor = colorValue;
                journalBoxEdit.style.backgroundColor = colorValue;

            }
        });
    });

    // Initialize the picker with the current value from the hidden input
    // This ensures the correct swatch is selected on page load/modal open
    setSelectedColor(journalColorInput.value);
});