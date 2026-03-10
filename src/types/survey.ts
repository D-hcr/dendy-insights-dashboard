export type RawSurveyRow = {
  label_id: string;
  tenant_id: string;
  survey_participation_id: string;
  participant_id: string;
  survey_id: string;
  question_id: string;
  evaluated_at: string;
  score: string;
  sentiment: string;
  risk_flag: string;
  tags: string;
  summary: string;
  checked_at: string;
  created_at: string;
  updated_at: string;
  should_display: string;
  display_label: string;
  display_note: string;
  severity: string;
  confidence: string;
  themes: string;
  risk_flags: string;
  action: string;
  label_payload: string;
  label_version: string;
  prompt_version: string;
  label_model: string;
  input_fingerprint: string;
  labeled_at: string;
};

export type Sentiment = "positive" | "neutral" | "negative" | "unknown";

export type SurveyRow = {
  labelId: number;
  tenantId: number | null;
  surveyParticipationId: number | null;
  participantId: number | null;
  surveyId: string;
  questionId: number | null;
  evaluatedAt: string;
  score: number | null;
  sentiment: Sentiment;
  riskFlag: boolean;
  tags: string[];
  summary: string;
  checkedAt: string;
  createdAt: string;
  updatedAt: string;
  shouldDisplay: boolean;
  displayLabel: string;
  displayNote: string;
  severity: number;
  confidence: number;
  themes: string[];
  riskFlags: string[];
  action: string;
  labelPayload: string;
  labelVersion: string;
  promptVersion: string;
  labelModel: string;
  inputFingerprint: string;
  labeledAt: string;
};

export type KpiStats = {
  totalResponses: number;
  displayedInsights: number;
  averageScore: number;
  riskCount: number;
  averageConfidence: number;
  averageSeverity: number;
};

export type SentimentBreakdown = {
  name: string;
  value: number;
};

export type ThemeBreakdown = {
  name: string;
  value: number;
};