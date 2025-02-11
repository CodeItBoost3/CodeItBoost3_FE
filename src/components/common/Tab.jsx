export default function Tab({ tabList, children, selectValue, onChangeValue, tabClassName }) {
  return (
    <nav className="border-b-normalGray flex justify-between border-b border-solid pt-4 text-lg font-semibold">
      <ul className="flex flex-wrap justify-start gap-4">
        {tabList.map(({ text, type }) => (
          <li
            role="presentation"
            key={text}
            className={`box-border flex cursor-pointer justify-center whitespace-nowrap px-5 ${selectValue === type ? 'border-b-2 border-black' : 'text-mediumGray'} ${tabClassName}`}
            onClick={e => onChangeValue(type, e)}
            onKeyDown={e => {
              if (e.key === 'Escape' || e.key === ' ') {
                onChangeValue(type, e);
              }
            }}
          >
            {text}
          </li>
        ))}
      </ul>
      {children && children}
    </nav>
  );
}