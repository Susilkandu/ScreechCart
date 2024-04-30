const log = require('../../../tools/log');
try {
  const { Item } = require('../../../modal/item/item');
  const { Order } = require('../../../modal/item/order');

  const addItem = async (req, res) => {
    try {
      const { name, model, category, price, description, qty, photo } = req.body;
      if (!name || !category || !price || !description) {
        return res.status(400).json({ error: 'Insufficient parameters provided', acklbool: 0 });
      }
      const data = new Item({
        name,
        model,
        category,
        price,
        description,
        seller: req.user._id,
        qty,
        photo
      });
      try {
        await data.save();
        return res.status(200).json({ message: `Item Added successfully`, acklbool: 1 });
      } catch (error) {
        return res.status(409).json({ message: `${name} Item is Already exist Or Some Parameter is Not complete`, error: error });
      }
    } catch (error) {
      log(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error, acklbool: 0 });
    }
  };
  const getItems = async (req, res) => {
    try {
      const { name, _id, model, category } = req.body;
      const query = {};
      _id && (query._id = { _id });
      name && (query.name = { $regex: new RegExp(name, 'i') });
      model && (query.model = { $regex: new RegExp(model, 'i') });
      category && (query.category = { $regex: new RegExp(category, 'i') });
      query.seller = req.user._id;
      const document = await Item.find(query).populate('photo').lean();
      res.status(200).json(document);
    } catch (error) {
      log(error);
      return res.status(500).json({ message: "Somer Internal Error Occured", error: error, acklbool: 0 })
    }
  }
  const updateQty = async (req, res) => {
    try {
      const { itemId, newQty } = req.body;
      if (!itemId || !newQty) {
        return res.status(400).json({ message: 'Insufficient parameters provided', acklbool: 0 });
      }
      else {
        await Item.findOneAndUpdate({ _id: itemId, seller: req.user._id }, { qty: newQty }, { new: true })
          .then((data) => {
            data !== null ? res.status(200).json({ message: "Qty Updated", acklbool: 1 }) : res.status(404).json({ message: "Item is not exist", acklbool: 0 });
          }).catch((error) => {
            return res.status(404).json({ message: "Item is not exist", acklbool: 0, error: error });
          })
      }
    } catch (error) {
      log(error);
      return res.status(500).json({ message: 'Internal Server Error', error: error, acklbool: 0 });
    }
  };
  const updateItem = async (req, res) => {
    try {
      const { _id, name, model, category, price, description, qty } = req.body;
      if (!_id || !name || !model || !category || !price || !description || !qty) {
        return res.status(400).json({ messager: 'All Parameter Require That You have not Provided', acklbool: 0 });
      }
      else {
        const newdata = { name, model, category, price, description, qty };
        await Item.findOneAndUpdate({ _id: _id, seller: req.user._id }, { $set: newdata })
          .then((data) => {
            data !== null ? res.status(200).json({ message: 'Item Details successfully', acklbool: 1 }) : res.status(404).json({ message: "Item is not exist", acklbool: 0 });
          }).catch((error) => {
            return res.status(404).json({ message: "Item is not exist", error: error, acklbool: 0 });
          })
      }
    } catch (error) {
      log(error);
      return res.status(500).json({ message: "Some Internal Error Occured", error: error, acklbool: 0 });
    }
  }
  const addPhoto = async (req, res) => {
    try {
      const { itemId, photoUrl } = req.body;
      if (!itemId || !photoUrl) {
        return res.status(404).json({ error: 'Item Id and Photo Url or Both not Gotten Bro', acklbool: 0 });
      }
      else {
        await Item.findOneAndUpdate({ _id: itemId, seller: req.user._id }, { $push: { photo: photoUrl } }, { new: true })
          .then((data) => {
            data !== null ? res.status(200).json({ message: 'Photo Added', acklbool: 1 }) : res.status(404).json({ message: "Item is not Found Or You Can not add more Than 5 Photo", error: error, acklbool: 0 });
          }).catch((error) => {
            return res.status(404).json({ message: "Item is not Found Or You Can not add more Than 5 Photo", error: error })
          })
      }
    } catch (error) {
      log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const deletePhoto = async (req, res) => {
    try {
      const { itemId, photoUrl } = req.params;
      if (!itemId || !photoUrl) {
        return res.status(400).json({ message: "Id and photo Url Not gotten", acklbool: 0 });
      } else {
        await Item.findOneAndUpdate({ _id: itemId, seller: req.user._id }, { $pull: { photo: photoUrl } })
          .then((data) => {
            data !== null ? res.json({ message: "Photo has been Deleted", acklbool: 1 }) : res.json({ message: "Item or Photo or boath not found", acklbool: 0 });
          }).catch((error) => {
            return res.json({ message: "Item or Photo or boath not found", error: error, acklbool: 0 });
          })
      }
    } catch (error) {
      log(error);
      return res.status(500).json({ error: 'Internal Server Error', error: error, acklbool: 0 });
    }
  }
  const deleteItemById = async (req, res) => {
    try {
      const itemId = req.params.itemId;
      if (!itemId) {
        return res.status(404).json({ error: 'Item Id not Gotten Bro' });
      } else {
        await Item.findOneAndDelete({ _id: itemId, seller: req.user._id })
          .then((data) => {
            data !== null ? res.status(200).json({ message: 'Item deleted successfully', acklbool: 1 }) : res.status(404).json({ message: 'Item Not Found', acklbool: 0 });
          }).catch((error) => {
            return res.status(404).json({ message: 'Item Not Found', error: error, acklbool: 0 });
          })
      }
    } catch (error) {
      log(error);
      return res.status(500).json({ error: 'Internal Server Error', error: error, acklbool: 0 });
    }
  };
  const showOrders = async (req, res) => {
    try {
      const obj = {};
      const itemId = req.body.itemId;
      const pStatus = req.body.pStatus;
      const status = req.body.status;
      itemId && (obj['item.id'] = itemId);
      pStatus && (obj['payment.status'] = pStatus);
      status && (obj.status = status);
      (obj['seller.id'] = req.seller._id);
      console.log(obj)
      await Order.find(obj).select('-seller')
        .then((data) => {
          if (!data || data.length <= 0) {
            return res.status(400).json({ message: "Order Not Available", acklbool: 0 });
          }
          return res.status(200).json({ data, acklbool: 1 });
        }).catch((error) => {
          return res.status(400).json({ message: "Some Error Occured While Fetching", error: error, acklbool: 0 });
        })
    } catch (error) {
      log(error);
      return res.status(500).json({ error: 'Internal Server Error', error: error, acklbool: 0 });
    }
  }
  // exporting module
  module.exports = {
    addItem,
    getItems,
    updateQty,
    updateItem,
    addPhoto,
    deletePhoto,
    deleteItemById,
    showOrders
  }
} catch (error) {
  log(error);
}