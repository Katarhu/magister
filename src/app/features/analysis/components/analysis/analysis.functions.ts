export namespace AnalysisFunctions {
  export const formatAnalysisDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} of ${month}, ${year}, ${formatDateTime(hours)}:${formatDateTime(minutes)}`;
  };

  const formatDateTime = (time: number): string => (time < 10 ? `0${time}` : time.toString());
}
