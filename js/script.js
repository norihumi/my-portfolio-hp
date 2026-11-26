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

// =======================================
// モーダルウィンドウ
// =======================================
const modal = document.getElementById('workModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeTargets = document.querySelectorAll('[data-modal-close]');

// バナー・チラシのカードだけ対象にする
const previewCards = document.querySelectorAll('.works__card[data-category="banner"], .works__card[data-category="flyer"]');

function openModal(imgSrc, imgAlt, titleText) {
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
    modalCaption.textContent = titleText;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 背景スクロールを一時停止
}

function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
}

previewCards.forEach((card) => {
    const link = card.querySelector('a');
    const thumbImg = card.querySelector('.works__img img');
    const titleEl = card.querySelector('.works__main');

    if (!link || !thumbImg) return;

    link.addEventListener('click', (e) => {
        e.preventDefault(); // '#' へのページジャンプを防ぐ
        const titleText = titleEl ? titleEl.textContent.trim() : thumbImg.alt;
        openModal(thumbImg.src, thumbImg.alt, titleText);
    });
});

closeTargets.forEach((el) => {
    el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});