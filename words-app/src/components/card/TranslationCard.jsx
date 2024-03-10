export default function TranslationCard({ english, russian }) {
  return (
    <div className="card">
      <div className="word">English: {english}</div>
      <div className="meaning">Russian: {russian}</div>
    </div>
  );
}
