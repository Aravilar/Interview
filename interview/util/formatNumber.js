export const formatNumber = number => {
    const numberFormat = new Intl.NumberFormat('hu-HU', {
        useGrouping: true,
    });
    
    const formatNumber = (value) => {
        if (typeof value !== 'number') {
            try {
                value = parseFloat(value.replace(/\s/g, '').replace(/[^0-9.]/g, ''));
            } catch (error) {
                return 'Invalid input';
            }
        }
        return numberFormat.format(value);
    };
    return formatNumber(number);
};
