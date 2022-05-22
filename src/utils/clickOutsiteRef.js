const clickOutsiteRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user toggle click
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.add('show');
        } else {
            if (toggle_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('show');
            }
        }
    });
};

export default clickOutsiteRef;