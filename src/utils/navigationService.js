import qs from "qs";

const navigationService = {
    navigate: url => window.location.href = url,
    openTab: url => window.open(url, '_blank'),
    scrollToTop: top => window.scrollTo({top: top || 0, behavior: "smooth"}),
    parseSearchString: searchString => qs.parse(searchString, {ignoreQueryPrefix: true}),
    buildSearchString: parsed => qs.stringify(parsed)
}

export default navigationService
