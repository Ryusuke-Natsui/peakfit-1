interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = '機能・用語・ワークフローを検索'
}: SearchInputProps) {
  return (
    <label className="search-input-wrapper">
      <span className="sr-only">検索</span>
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
