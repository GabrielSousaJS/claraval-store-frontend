export const formatPrice = (price: number) => {
    const params = {maximumFractionDigits: 2, minimumFractionDigits: 2};
    return Intl.NumberFormat('pt-BR', params).format(price);
}

export const formatDate = (moment: string) => {
    const date = new Date(moment);
    const formattedDate = Intl.DateTimeFormat("pt-BR").format(date);
    return formattedDate;
  }