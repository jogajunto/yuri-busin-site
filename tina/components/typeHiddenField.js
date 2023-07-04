import React from 'react';

const TypeHiddenFieldComponent = ({ field, input, meta }) => {
	return (
		<div>
			<input name={input.name} id={input.name} type="hidden" {...input} />
		</div>
	);
};

const TypeHiddenField = (props) => <TypeHiddenFieldComponent {...props} />;

export default TypeHiddenField;
