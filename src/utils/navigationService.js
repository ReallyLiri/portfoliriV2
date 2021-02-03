const navigationService = {
    navigate: url => window.location.href = url,
    openTab: url => window.open(url, '_blank'),
    scrollToTop: top => window.scrollTo({top: top || 0, behavior: "smooth"})
}

export default navigationService
