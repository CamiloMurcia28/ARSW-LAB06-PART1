package edu.eci.arsw.blueprints.persistence;

import edu.eci.arsw.blueprints.model.Blueprint;

import java.util.Set;

public interface Filter {
    public Blueprint applyFilter(Blueprint bp);

    public Set<Blueprint> multiFilterBlueprint(Set<Blueprint> bps);
}
