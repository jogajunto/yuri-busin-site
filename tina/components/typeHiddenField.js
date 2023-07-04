import React from 'react';

const TypeHiddenFieldComponent = ({ field, input, meta }) => {
	return (
		<div>
			<input
				name={input.name}
				id={input.name}
				type="hidden"
				// This will pass along props.input.onChange to set our form values as this input changes.
				{...input}
			/>
		</div>
	);
};

const TypeHiddenField = (props) => <TypeHiddenFieldComponent {...props} />;

export default TypeHiddenField;
