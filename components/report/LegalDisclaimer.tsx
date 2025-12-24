import React from 'react';

const LegalDisclaimer = () => {
    return (
        <div className="w-full py-8 px-6 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 mt-auto">
            <div className="max-w-4xl text-center space-y-2">
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium tracking-wide uppercase">
                    Nota Legale
                </p>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                    <span className="font-bold text-gray-400">Nota Importante:</span> Il presente report è un prototipo a scopo puramente dimostrativo e statico. Tutti i dati, incluse le stime immobiliari, le analisi finanziarie, i tassi di mutuo e le valutazioni di rischio, sono fittizzi e non certificati. HouseVertical non si assume alcuna responsabilità per l'accuratezza delle informazioni fornite che non costituiscono in alcun modo consulenza finanziaria, legale o immobiliare professionale.
                </p>
            </div>
        </div>
    );
};

export default LegalDisclaimer;
