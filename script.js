document.addEventListener('DOMContentLoaded', function() {
    const flashcardForm = document.getElementById('flashcard-form');
    const flashcardsContainer = document.getElementById('flashcards-container');
    let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  
    renderFlashcards();
  
    flashcardForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const englishWord = document.getElementById('english-word').value.trim();
      const czechTranslation = document.getElementById('czech-translation').value.trim();
      const explanation = document.getElementById('explanation').value.trim();
  
      if (englishWord && czechTranslation && explanation) {
        const newFlashcard = {
          englishWord: englishWord,
          czechTranslation: czechTranslation,
          explanation: explanation
        };
  
        flashcards.push(newFlashcard);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
  
        renderFlashcards();
        flashcardForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  
    function renderFlashcards() {
      flashcardsContainer.innerHTML = '';
  
      flashcards.forEach(function(flashcard, index) {
        const card = document.createElement('div');
        card.classList.add('flashcard');
  
        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = flashcard.englishWord;
  
        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = `${flashcard.czechTranslation} - ${flashcard.explanation}`;
  
        card.appendChild(front);
        card.appendChild(back);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
          flashcards.splice(index, 1);
          localStorage.setItem('flashcards', JSON.stringify(flashcards));
          renderFlashcards();
        });
  
        card.appendChild(deleteButton);
  
        card.addEventListener('click', function() {
          card.classList.toggle('flipped');
        });
  
        flashcardsContainer.appendChild(card);
      });
    }
  });
  
  