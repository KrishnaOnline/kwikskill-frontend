export const formatTime = (dateTimeString) => {
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', year: 'numeric' }).format(new Date(dateTimeString))
}