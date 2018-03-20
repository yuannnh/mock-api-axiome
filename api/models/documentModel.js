var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttachmentSchema = new Schema({
  name: {
    type: String,
    required: 'Attachment name is required. type: String'
  },

  url: {
    type: String,
    required: 'Attachment URL is required. type: String'
  },
  htmlCodeIntegration: String,
  pageSourceURL: String,
  pageSourceText: String,
  fileBinary: String,
  fileName: String,
  fileSize: String,
  filePath: String
});

var IconSchema = new Schema({
    iconText: String,
    fileNmae: String,
    fileSize: String
});

var DocSchema = new Schema({
  id: {
    type: String,
    required: 'Document id is required. type: String'
  },
  name: {
    type: String,
    required: 'Document name is required. type: String'
  },
  keywords: [String],
  language:{
    type: String,
    enum: ['francais FR', 'anglais EN', 'espagnol ES', 'polonais PL'],
    default: 'francais FR'
  },
  type: {
    type: String,
    enum: ['file', 'video'],
    default: 'file'
  },
  lastModificationDate:{
    type: Date,
    default: Date.now
  },
  lastModificationAuthor:{
    type: String,
    required: 'lastModificationAuthor is required. type: String'
  },
  diffusion: {
    type: String,
    enum: ['internal', 'external'],
    default: 'internal'
  },
  attachment: {
    type: AttachmentSchema,
    required:'attachment information is required. type: AttachementSchema'
  },
  environment: {
    type: String,
    enum: ['France', 'International', 'Operateur'],
    default: 'France'
  },
  icon: IconSchema,
  ranking: {
    type: [String],
    enum: ['SalesAids', 'FieldsOfActivity'],
    default: ['SalesAids']
  }
  
});

module.exports = mongoose.model('Document', DocSchema);

