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
    if (str) {
      if (str.trim().length > 0) {
        const numberFloat = parseFloat(str);
        booleanIsTrue = numberFloat >= 0.0;
      } else {
        booleanIsTrue = false;
      }
    } else {
      booleanIsTrue = false;
    }
    return booleanIsTrue;
  }
}

export { UtilanPelengkap };
