module.exports = {


    friendlyName: 'Buy Item',
  
  
    description: '',
  
  
    inputs: {
  
      item_id : {
        description : "Item ID",
        type : 'string',
        required : true,
      },
  
      store_id : {
        description : "Store ID",
        type : 'string',
        required : true,
      },
    },
  
  
    exits: {
  
      failedToBuy: {
        description: 'Failed to buy.',
      },
  
    },
  
  
    fn: async function ({item_id, store_id}) {
        const result = await sails.appDomain.store.buyItem(this.req?.user?.userID, item_id, store_id);
        if (! result) {
            throw 'failedToBuy';
        }
        
        return {
            result
        };

    },
  
  
  };
  