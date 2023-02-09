export const getMortgageRates = async () => {
    try {
        const response = await fetch("https://developer.sbab.se/sandbox/api/interest-rates/2.0/mortgage-rates");
        if (response.ok) {            
            const data = response.json();
            return data;
        } else {
            console.log("Response not ok, status:" + response.status)
        }

    } catch (error) {
        console.log(error);
    }
};