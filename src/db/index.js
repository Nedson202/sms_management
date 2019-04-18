/**
 * Handles queries to the database
 *
 * @class DB
 */
class DB {
  /**
   * Create a new record in the collection with model specified
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @returns
   * @memberof DB
   */
  static async create(Model, query) {
    try {
      const createdDocument = await Model.create(query);
      return createdDocument;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Paginate record using mongoose-paginate
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @param {*} query command to processOptions
   * @returns
   * @memberof DB
   */
  static async paginateAll(Model, query, queryOptions) {
    try {
      const document = await Model.paginate(query, queryOptions);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve all records based on specified query
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @returns
   * @memberof DB
   */
  static async findAll(Model, query) {
    try {
      const document = await Model.find(query);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve a record using the record's ID
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @returns
   * @memberof DB
   */
  static async findById(Model, query) {
    try {
      const document = await Model.findById(query);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve a record base on field specified
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} field collection field to read from
   * @param {*} value
   * @returns
   * @memberof DB
   */
  static async findOne(Model, field, value) {
    try {
      const retrievedDocument = await Model.findOne({
        [field]: value
      });
      return retrievedDocument;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Soft delete record(s) from a collection
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @memberof DB
   */
  static async delete(Model, query) {
    try {
      await Model.delete(query);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete multiple records without soft-delete
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @memberof DB
   */
  static async deleteMany(Model, query) {
    try {
      await Model.deleteMany(query);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update database record
   *
   * @static
   * @param {*} Model database collection to query
   * @param {*} query command to process
   * @param {*} data field and data to update
   * @param {*} returnOptions return options for the newly updated document
   * @returns
   * @memberof DB
   */
  static async updateOne(Model, query, data, returnOptions) {
    try {
      const updatedDocument = await Model.findOneAndUpdate(query, data, returnOptions);
      return updatedDocument;
    } catch (error) {
      throw error;
    }
  }
}

export default DB;
