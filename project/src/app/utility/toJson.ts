function formDataToJson(formData: FormData): string {
    const object: any = {};
    formData.forEach((value, key) => {
      // If key already exists (e.g., for arrays), convert it into an array
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }
        object[key].push(value);
      } else {
        object[key] = value;
      }
    });
    return JSON.parse(JSON.stringify(object));
  }
  
  export default formDataToJson;