

export const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    }).format(dateObject);

    return formattedDate

}