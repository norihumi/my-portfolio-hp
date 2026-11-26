// =======================================
// カテゴリーフィルター
// =======================================
const filterButtons = document.querySelectorAll('.works__btn');
const cards = document.querySelectorAll('.works__card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.filter;

        // 選択中ボタンの見た目を切り替え
        filterButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');

        // カードの表示・非表示を切り替え
        cards.forEach((card) => {
            const cardCategory = card.dataset.category;

            if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                card.style.display = ''; // CSS Grid / 元の表示に戻す
            } else {
                card.style.display = 'none';
            }
        });
    });
});