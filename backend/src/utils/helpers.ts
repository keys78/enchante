export const extractPublicIdFromImageUrl = (imageUrl: string) => {
    const segments = imageUrl.split('/');
    const publicId = segments.slice(-2).join('/');
    return publicId.substring(0, publicId.lastIndexOf('.'));
};


export const validateFields = (fields: any) => {
    switch (false) {
      case Boolean(fields.name):
        return { isValid: false, message: 'Name is a required field mugu' };
      case Boolean(fields.category):
        return { isValid: false, message: 'Category is a required field' };
      case Boolean(fields.desc):
        return { isValid: false, message: 'Description is a required field' };
      case Boolean(fields.sizes):
        return { isValid: false, message: 'Sizes are required' };
      case Boolean(fields.color):
        return { isValid: false, message: 'Color is a required field' };
      case Boolean(fields.free_shipping):
        return { isValid: false, message: 'Free shipping is a required field' };
      case Boolean(fields.brand):
        return { isValid: false, message: 'Brand is a required field' };
      case Boolean(fields.price):
        return { isValid: false, message: 'Price is a required field' };
      case Boolean(fields.new_product):
        return { isValid: false, message: 'Is It a New product, is a required field' };
      case Boolean(fields.discount):
        return { isValid: false, message: 'Is Discount Available is a required field' };
      case Boolean(fields.star_ratings):
        return { isValid: false, message: 'Star ratings is a required field' };
      default:
        return { isValid: true };
    }
  };