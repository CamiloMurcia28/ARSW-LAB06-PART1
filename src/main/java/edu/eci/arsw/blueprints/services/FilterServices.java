package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Set;
@Service
public class FilterServices {
    @Autowired
    @Qualifier("DuplicatedFilter")
    Filter filter;

    public void applyFilter(Blueprint bp)   {
        filter.applyFilter(bp);
    }

    public void multiFilterBlueprint(Set<Blueprint> bps) {
        filter.multiFilterBlueprint(bps);
    }
}
