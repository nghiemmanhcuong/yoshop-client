const handleCloseMsg = (errorMsg,errorClose,successMsg,successClose) => {
    if(errorMsg && errorClose) {
        errorClose.current.onclick = () => {
            errorMsg.current.style.display = 'none';
        }
    }

    if(successMsg && successClose) {
        successClose.current.onclick = () => {
            successMsg.current.style.display = 'none';
        }
    }
}

export default handleCloseMsg;