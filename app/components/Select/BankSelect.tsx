import Loading from 'components/Loading/Loading';
import { Bank } from 'models/types';
import React, { useEffect, useState } from 'react';

import Select from './Select';
import { SelectProps } from './Select.types';

const BankSelect = ({
	currencyId,
	onSelect,
	selected,
	error,
	labelStyle = ''
}: {
	currencyId: number;
	onSelect: SelectProps['onSelect'];
	selected: SelectProps['selected'];
	error?: SelectProps['error'];
	labelStyle?: SelectProps['labelStyle'];
}) => {
	const [banks, setBanks] = useState<Bank[]>();
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/banks?currency_id=${currencyId}`)
			.then((res) => res.json())
			.then((data) => {
				setBanks(data);
				setLoading(false);
			});
	}, [currencyId]);

	if (isLoading) {
		return <Loading />;
	}

	return banks ? (
		<Select label="Payment Method" options={banks} selected={selected} onSelect={onSelect} error={error} />
	) : (
		<></>
	);
};
export default BankSelect;
