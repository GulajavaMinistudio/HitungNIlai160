class UtilanPelengkap {

  isEmptyStringsNulls(str): boolean {
    let booleanIsTrue = false;
    if (!str || str.trim().length === 0) {
      booleanIsTrue = true;
    }
    return booleanIsTrue;
  }

  isValidNumberFloatBenar(str): boolean {

    let booleanIsTrue = false;
    if (!str || str.trim().length === 0) {
      try {
        const numberFloat = parseFloat(str);
        if (numberFloat >= 0.0) {
          booleanIsTrue = true;
        } else {
          booleanIsTrue = false;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return booleanIsTrue;
  }
}

export { UtilanPelengkap };
