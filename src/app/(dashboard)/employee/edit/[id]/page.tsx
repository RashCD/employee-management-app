import React from 'react';

interface EditDetailProps {
	params: {
		id: string;
	};
}

const EditDetail: React.FC<EditDetailProps> = ({ params }) => {
	return <div>EditDetail {params.id} </div>;
};

export default EditDetail;
