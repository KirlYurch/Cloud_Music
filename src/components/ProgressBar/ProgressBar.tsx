import styles from "./ProgressBar.module.css";
type ProgressBarProps = {
    max: number, value: number, onChange: (value: number) => void
}

export default function ProgressBar({ max, value, onChange }: ProgressBarProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        onChange(newValue)
    }
    return (
        <input
            className={styles.styledProgressInput} // Применение стилей к ползунку
            type="range" // Тип элемента - ползунок
            min="0" // Минимальное значение ползунка
            max={max} // Максимальное значение, зависит от длительности аудио
            value={value} // Текущее значение ползунка
            step={0.01} // Шаг изменения значения
            onChange={handleChange} // Обработчик события изменения
        />
    );
}