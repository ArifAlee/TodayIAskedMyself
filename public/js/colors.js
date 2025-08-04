document.addEventListener('DOMContentLoaded', () => {
    const colorSwatchItems = document.querySelectorAll('.color-swatch-item');
    const journalColorInput = document.getElementById('journal-color-input');
    const journalColorEditInput = document.getElementById('journal-color-edit-input');
    const invalidFeedback = document.querySelector('.invalid-feedback');

    // Function to update the selected color and UI
    function setSelectedColor(colorValue) {
        let finalColor = colorValue;

        // Update hidden input
        journalColorInput.value = finalColor;
        journalColorEditInput.value = finalColor;

        journalBox.style.backgroundColor = colorValue;
        journalBoxEdit.style.backgroundColor = colorValue;

        // Remove 'selected' class from all swatches
        colorSwatchItems.forEach(item => {
            item.querySelector('.color-swatch').classList.remove('selected');
        });

        // Add 'selected' class to the clicked swatch 
        const clickedSwatch = document.querySelector(`.color-swatch-item[data-value="${colorValue}"] .color-swatch`);
        if (clickedSwatch) {
            clickedSwatch.classList.add('selected');
        } 
        // Hide validation message
        invalidFeedback.style.display = 'none';
    }

    const journalBox = document.querySelector(".journal-entry");
    const journalBoxEdit = document.querySelector(".journal-entry-edit");
    // Add click event listeners to all color swatch items
    colorSwatchItems.forEach(item => {
        item.addEventListener('click', () => {
            const colorValue = item.getAttribute('data-value');
            setSelectedColor(colorValue);
            // if(item){
            //     try{
            //         journalBox.style.backgroundColor = colorValue;
            //         journalBoxEdit.style.backgroundColor = colorValue;
            //     }catch{
                    
            //     }
            // }
        });
    });


});