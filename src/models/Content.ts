import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEpisode {
  episodeNumber: number;
  title: string;
  description: string;
  duration: number; // minutes
  videoUrl: string;
  thumbnailUrl: string;
}

export interface ISeason {
  seasonNumber: number;
  episodes: IEpisode[];
}

export interface IContent extends Document {
  type: 'movie' | 'series' | 'live_sports';
  title: string;
  description: string;
  genres: string[];
  year: number;
  rating: number;
  backdropUrl: string;
  posterUrl: string;
  trailerUrl?: string;
  duration?: number; // for movies
  seasons?: ISeason[]; // for series
  // live sports
  sportType?: string;
  matchTitle?: string;
  teamA?: string;
  teamB?: string;
  teamALogo?: string;
  teamBLogo?: string;
  isLive?: boolean;
  viewerCount?: number;
  liveStreamUrl?: string;
  isFeatured: boolean;
  isTrending: boolean;
  isNewRelease: boolean;
  requiredPlan: 'mobile' | 'standard' | 'premium';
  language: string;
  country: string;
  cast: string[];
  director?: string;
  contentRating: string;
  createdAt: Date;
  updatedAt: Date;
}

const EpisodeSchema = new Schema<IEpisode>({
  episodeNumber: { type: Number, required: true },
  title:         { type: String, required: true },
  description:   { type: String },
  duration:      { type: Number },
  videoUrl:      { type: String },
  thumbnailUrl:  { type: String },
}, { _id: false });

const SeasonSchema = new Schema<ISeason>({
  seasonNumber: { type: Number, required: true },
  episodes:     [EpisodeSchema],
}, { _id: false });

const ContentSchema = new Schema<IContent>(
  {
    type:          { type: String, enum: ['movie', 'series', 'live_sports'], required: true },
    title:         { type: String, required: true, index: true },
    description:   { type: String },
    genres:        [{ type: String }],
    year:          { type: Number },
    rating:        { type: Number, min: 0, max: 10 },
    backdropUrl:   { type: String },
    posterUrl:     { type: String },
    trailerUrl:    { type: String },
    duration:      { type: Number },
    seasons:       [SeasonSchema],
    sportType:     { type: String },
    matchTitle:    { type: String },
    teamA:         { type: String },
    teamB:         { type: String },
    teamALogo:     { type: String },
    teamBLogo:     { type: String },
    isLive:        { type: Boolean, default: false },
    viewerCount:   { type: Number, default: 0 },
    liveStreamUrl: { type: String },
    isFeatured:    { type: Boolean, default: false },
    isTrending:    { type: Boolean, default: false },
    isNewRelease:  { type: Boolean, default: false },
    requiredPlan:  { type: String, enum: ['mobile', 'standard', 'premium'], default: 'mobile' },
    language:      { type: String, default: 'Hindi' },
    country:       { type: String, default: 'India' },
    cast:          [{ type: String }],
    director:      { type: String },
    contentRating: { type: String, default: 'U/A' },
  },
  { timestamps: true }
);

ContentSchema.index({ title: 'text', description: 'text', genres: 'text' });

const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
export default Content;
