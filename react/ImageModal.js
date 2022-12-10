const ImageModal = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <antd.Button onClick={showModal}>Click</antd.Button>

            <antd.Modal title="title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Hello
            </antd.Modal>
        </>
    );
}