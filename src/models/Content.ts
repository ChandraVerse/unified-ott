import { Schema, model, models } from 'mongoose';

const ContentSchema = new Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String },
    type:        { type: String, enum: ['movie', 'series', 'live'], required: true },
    genre:       [String],
    year:        Number,
    rating:      Number,
    duration:    Number,             // minutes (movies) or episode count (series)
    seasons:     Number,             // series only
    episodes:    Number,             // series only
    backdropUrl: String,
    posterUrl:   String,
    // Live sports
    channel:     String,
    sportType:   String,
    matchTitle:  String,
    teamLogos:   [String],
    isLive:      { type: Boolean, default: false },
    viewerCount: Number,
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Atlas Search index on title, genre, description
ContentSchema.index({ title: 'text', description: 'text', genre: 'text' });

const Content = models.Content ?? model('Content', ContentSchema);
export default Content;
